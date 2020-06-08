using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Slot.Karma.API.UnitOfWork.Repository;
using Slot.Karma.Web.API.Model;
using Slot.Karma.Web.API.Model.Extensions;

namespace Slot.Karma.Web.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CasinoController : BaseController
  {
    private readonly ILogger<CasinoController> logger;
    private readonly AuthenticationManager userManager;

    public CasinoController(ILogger<CasinoController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }



    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list")]
    public ActionResult<Response<List<Slot.Karma.API.Model.Casino>>> list(
      [FromQuery] Int32 skip, 
      [FromQuery] Int32 take,
      [FromQuery] String orderby, 
      [FromQuery] String dir,
      [FromQuery] String keyword) {
      IList<Slot.Karma.API.Model.Casino> records = this.uow.Get<CasinoRepository>().FindAll(c => c.Name.ToLower().StartsWith(keyword.ToLower())).Skip(skip).Take(take).ToList();
      return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.Casino>>() { Obj = records, Status = 200, Message = "" });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("select/{cid}")]
    public ActionResult<Response<Slot.Karma.API.Model.Casino>> select([FromRoute] ulong cid) {
      Slot.Karma.API.Model.Casino record = this.uow.Get<CasinoRepository>().Find(cid);
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      if (record!=null && claim != null) {
        Slot.Karma.API.Model.User user = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        user.SelectedSlotMachine = null;
        user.CasinoId = cid;
        user.Casino = record;
        try {
          this.uow.Get<UserRepository>().Update(user);
          this.uow.Save();
          this.User.AddUpdateClaim(this.HttpContext, userManager, user, ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(user, this.JsonSettings));
          record.User = null;
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.Casino>() { Obj = record, Status = 200, Message = "" });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }

      }
      return this.StatusCode(404, new Response<Slot.Karma.API.Model.Casino>() { Obj = null, Status = 404, Message = "Not Found" });
    }
  }
}
