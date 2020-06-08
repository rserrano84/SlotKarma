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
  public class SlotMachineController : BaseController {
    private readonly ILogger<SlotMachineController> logger;
    private readonly AuthenticationManager userManager;

    public SlotMachineController(ILogger<SlotMachineController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list/{cid}")]
    public ActionResult<Response<List<Slot.Karma.API.Model.SlotMachine>>> List(
      [FromRoute] ulong cid,
      [FromQuery] Int32 skip, 
      [FromQuery] Int32 take,
      [FromQuery] String orderby, 
      [FromQuery] String dir,
      [FromQuery] String keyword) {
      IList<Slot.Karma.API.Model.SlotMachine> records = String.IsNullOrEmpty(keyword) ?
        this.uow.Get<SlotMachineRepository>().FindAll(s => s.CasinoId == cid).Skip(skip).Take(take).ToList() :
        this.uow.Get<SlotMachineRepository>().FindAll(s =>  s.CasinoId == cid && (s.Name.ToLower().StartsWith(keyword.ToLower()) || s.Number.ToLower().StartsWith(keyword.ToLower()))).Skip(skip).Take(take).ToList();
      return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.SlotMachine>>() { Obj = records, Status = 200, Message = "" });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("select/{sid}")]
    public ActionResult<Response<Slot.Karma.API.Model.SlotMachine>> Select([FromRoute] ulong sid) {
      Slot.Karma.API.Model.SlotMachine slot = this.uow.Get<SlotMachineRepository>().FindFirst(s=>s.Id==sid, new List<String>() { "Casino"});
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      if (claim != null) {
        Slot.Karma.API.Model.User user = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        user.Casino = slot.Casino;
        user.SelectedSlotMachine = slot;
        this.User.AddUpdateClaim(this.HttpContext, userManager, user, ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(user, this.JsonSettings));
        return this.StatusCode(200, new Response<Slot.Karma.API.Model.SlotMachine>() { Obj = slot, Status = 200, Message = "" });
      }
      return this.StatusCode(404, new Response<Slot.Karma.API.Model.SlotMachine>() { Obj = null, Status = 404, Message = "" });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPost]
    public ActionResult<Response<Slot.Karma.API.Model.SlotMachine>> Create(
      [FromBody]Slot.Karma.API.Model.SlotMachine slotMachine
    ) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        if (u.CasinoId!=null) {
          slotMachine.CasinoId = u.CasinoId;
          slotMachine.Casino = null;
          slotMachine.Number = slotMachine.Number.Trim();
          slotMachine.Name = slotMachine.Name.Trim();
          Slot.Karma.API.Model.SlotMachine record = this.uow.Get<SlotMachineRepository>().FindFirstBy(s => s.Number == slotMachine.Number && s.CasinoId== slotMachine.CasinoId, null);
          if (record != null) {
            return this.StatusCode(400, new Response<Slot.Karma.API.Model.SlotMachine>() { Obj = null, Status = 400, Message = String.Format("{0} already exists", slotMachine.Number)});
          }
          try {
            this.uow.Get<SlotMachineRepository>().Add(slotMachine);
            this.uow.Save();
            return this.Select(slotMachine.Id);
          }
          catch (Exception e) {
            logger.LogError(e, e.Message);
          }
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.SlotMachine>() { Obj = null, Status = 400, Message = "There was an unexpected error. Please try again." });
    }

  }
}
