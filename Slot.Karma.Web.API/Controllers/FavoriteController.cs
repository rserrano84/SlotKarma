using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Slot.Karma.API.UnitOfWork.Repository;
using Slot.Karma.Web.API.Model;
using Slot.Karma.API.Model;

namespace Slot.Karma.Web.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class FavoriteController : BaseController {
    private readonly ILogger<FavoriteController> logger;
    private readonly AuthenticationManager userManager;

    public FavoriteController(ILogger<FavoriteController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list")]
    public ActionResult<Response<List<Slot.Karma.API.Model.Favorite>>> List(
      [FromQuery] Int32 skip, 
      [FromQuery] Int32 take,
      [FromQuery] String orderby, 
      [FromQuery] String dir,
      [FromQuery] String keyword) {

      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          IList<Slot.Karma.API.Model.Favorite> records = this.uow.Get<FavoriteRepository>().FindAll(f => f.UserId == u.Id, new List<String>() { "SlotMachine", "SlotMachine.Casino" }, "SlotMachine.Name", "ASC").
            Skip(skip).Take(take).ToList();
          return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.Favorite>>() { Obj = records, Status = 200, Message = "" });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.Favorite>() { Obj = null, Status = 400, Message = "There was an error recording your karma." });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPost]
    [Route("{sid}")]
    public ActionResult<Response<Slot.Karma.API.Model.Favorite>> Create(
      [FromRoute] ulong sid) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          var record = this.uow.Get<FavoriteRepository>().FindFirstBy(f => f.SlotMachineId ==sid && f.UserId == u.Id );
          if (record!=null) {
            return this.StatusCode(400, new Response<Slot.Karma.API.Model.Favorite>() { Obj = null, Status = 400, Message = "You already added this machine to your favorites." });
          }
          Slot.Karma.API.Model.Favorite favorite = new Slot.Karma.API.Model.Favorite() { UserId = u.Id, SlotMachineId=sid};
          this.uow.Get<FavoriteRepository>().Add(favorite);
          this.uow.Save();
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.Favorite>() { Obj = favorite, Status = 200, Message = "This machine was added to your favorites" });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.Favorite>() { Obj = null, Status = 400, Message = "There was an error saving this machine to your favorites." });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpDelete]
    [Route("{id}")]
    public ActionResult<Response<Slot.Karma.API.Model.Favorite>> Delete(
      [FromRoute] ulong id) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          Slot.Karma.API.Model.Favorite favorite = new Slot.Karma.API.Model.Favorite() { UserId = u.Id, Id = id };
          this.uow.Get<FavoriteRepository>().DeleteAll(f=>f.UserId==u.Id && f.Id==id);
          this.uow.Save();
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.Favorite>() { Obj = favorite, Status = 200, Message = "This machine was removed from your favorites" });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.Favorite>() { Obj = null, Status = 400, Message = "There was an error removing this machine from your favorites." });

    }

  }
}
