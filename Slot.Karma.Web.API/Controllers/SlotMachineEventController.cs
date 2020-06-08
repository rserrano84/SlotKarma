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
  public class SlotMachineEventController : BaseController {
    private readonly ILogger<SlotMachineEventController> logger;
    private readonly AuthenticationManager userManager;

    public SlotMachineEventController(ILogger<SlotMachineEventController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("{seid}")]
    public ActionResult<Response<Slot.Karma.API.Model.SlotMachineEvent>> Get([FromRoute] ulong seid) {
      Slot.Karma.API.Model.SlotMachineEvent slotEvent = this.uow.Get<SlotMachineEventRepository>().FindFirst(e=>e.Id == seid, new List<String>() {"User"});
      if (slotEvent != null) {
        return this.StatusCode(200, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = slotEvent, Status = 200, Message = "" });
      }
      return this.StatusCode(404, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = null, Status = 404, Message = "" });
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list/{sid}")]
    public ActionResult<Response<List<Slot.Karma.API.Model.SlotMachineEvent>>> List(
      [FromRoute] ulong sid,
      [FromQuery] Int32 skip, 
      [FromQuery] Int32 take,
      [FromQuery] String orderby, 
      [FromQuery] String dir,
      [FromQuery] String keyword) {

      IList<Slot.Karma.API.Model.SlotMachineEvent> records = this.uow.Get<SlotMachineEventRepository>().FindAll(e => e.SlotMachineId==sid, null, "Start", "DESC").
        Skip(skip).Take(take).ToList();
      return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.SlotMachineEvent>>() { Obj = records, Status = 200, Message = "" });
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("history")]
    public ActionResult<Response<List<Slot.Karma.API.Model.SlotMachineEvent>>> History(
      [FromQuery] Int32 skip,
      [FromQuery] Int32 take,
      [FromQuery] String orderby,
      [FromQuery] String dir,
      [FromQuery] String keyword) {

      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        IList<Slot.Karma.API.Model.SlotMachineEvent> records = this.uow.Get<SlotMachineEventRepository>().FindAll(e => e.UserId == u.Id, new List<String>() { "SlotMachine.Casino" }, "Start", "DESC").
        Skip(skip).Take(take).ToList();
        return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.SlotMachineEvent>>() { Obj = records, Status = 200, Message = "" });
      }
      else {
        return this.StatusCode(400, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = null, Status = 400, Message = "There was an error loading your karma history." });
      }
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPost]
    [Route("{seid}")]
    public ActionResult<Response<Slot.Karma.API.Model.SlotMachineEvent>> Create(
      [FromRoute] long seid, 
      [FromBody]Slot.Karma.API.Model.SlotMachineEvent slotMachineEvent) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          slotMachineEvent.UserId = u.Id;
          slotMachineEvent.SlotMachineId = u.SelectedSlotMachine.Id;
          this.uow.Get<SlotMachineEventRepository>().Add(slotMachineEvent);
          this.uow.Save();
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = slotMachineEvent, Status = 200, Message = "Your karma was recorded." });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = slotMachineEvent, Status = 400, Message = "There was an error recording your karma." });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPost]
    [Route("anonymous/{seid}")]
    public ActionResult<Response<Slot.Karma.API.Model.SlotMachineEvent>> Anonymous(
      [FromRoute] long seid,
      [FromBody]Slot.Karma.API.Model.SlotMachineEvent slotMachineEvent) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          slotMachineEvent.UserId = null;
          slotMachineEvent.SlotMachineId = u.SelectedSlotMachine.Id;
          this.uow.Get<SlotMachineEventRepository>().Add(slotMachineEvent);
          this.uow.Save();
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = slotMachineEvent, Status = 200, Message = "The karma was recorded." });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
        }
      }
      return this.StatusCode(400, new Response<Slot.Karma.API.Model.SlotMachineEvent>() { Obj = slotMachineEvent, Status = 400, Message = "There was an error recording karma." });
    }
  }
}
