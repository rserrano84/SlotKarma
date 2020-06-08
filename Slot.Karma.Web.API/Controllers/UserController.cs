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
using Slot.Karma.Web.API.Model.Extensions;

namespace Slot.Karma.Web.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : BaseController
  {
    private readonly ILogger<UserController> logger;
    private readonly AuthenticationManager userManager;

    public UserController(ILogger<UserController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }

    [HttpGet]
    [Route("whois/{uid}")]
    public ActionResult<Response<Slot.Karma.API.Model.User>> whois([FromRoute] string uid) {
      Slot.Karma.API.Model.User record = null;
      ulong id = 0;
      if (ulong.TryParse(uid, out id)) {
        record = this.uow.Get<UserRepository>().FindFirstBy(u => u.Id == id, new List<string>() { "Casino" });
      }
      else {
        record = this.uow.Get<UserRepository>().FindFirstBy(u => u.Username == uid, new List<string>() { "Casino" });
      }
      return record == null ?
        this.StatusCode(404, new Response<Slot.Karma.API.Model.User>() { Obj = record, Status = 404, Message = String.Format("User {0} not found", uid) }) : 
        this.StatusCode(200, new Response<Slot.Karma.API.Model.User>() { Obj = record, Status = 200, Message = "" });
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPut]
    [Route("accept")]
    public ActionResult<Response<User>> Accept() {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
      if (claim != null) {
        ulong id = 0;
        if (ulong.TryParse(claim.Value, out id)) {
          Slot.Karma.API.Model.User record = this.uow.Get<UserRepository>().FindFirstBy(u => u.Id == id, null);
          record.Accepted = 1;
          try {
            this.uow.Get<UserRepository>().Update(record);
            this.uow.Save();
            record = this.uow.Get<UserRepository>().FindFirstBy(u => u.Id == id, new List<string>() { "Casino" });
            this.User.AddUpdateClaim(this.HttpContext, userManager, record, ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(record, this.JsonSettings));
            return this.StatusCode(200, new Response<User>() { Obj = record, Status = 200, Message = "You accepted the terms" });
          }
          catch (Exception e) {
            logger.LogError(e, e.Message);
          }
        }
      }
      return this.StatusCode(400, new Response<User>() { Obj = null, Status = 400, Message = "There was an unexpected error accepting the terms. Please try again." });

    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPut]
    public ActionResult<Response<User>> Update([FromBody] Slot.Karma.API.Model.User user) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);

      if (claim != null) {
        Slot.Karma.API.Model.User u = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        try {
          if (u.Casino != null) {
            u.CasinoId = u.Casino.Id;
          }
          u.Zip = user.Zip;
          u.Gender = user.Gender;
          u.CanContact = user.CanContact;
          this.uow.Get<UserRepository>().Update(u);
          this.uow.Save();
          this.User.AddUpdateClaim(this.HttpContext, userManager, u, ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(u, this.JsonSettings));
          return this.StatusCode(200, new Response<Slot.Karma.API.Model.User>() { Obj = u, Status = 200, Message = String.Format("{0}'s profile was updated.", user.Username) });
        }
        catch (Exception e) {
          logger.LogError(e, e.Message);
          return this.StatusCode(400, new Response<User>() { Obj = null, Status = 400, Message = String.Format("Unable to Update {0}", user.Username) });
        }
      }
      return this.StatusCode(400, new Response<User>() { Obj = null, Status = 400, Message = String.Format("Unable to Update {0}", user.Username)});
    }

    [HttpPost]
    public ActionResult<Response<User>> Create([FromBody] Slot.Karma.API.Model.User user) {
      try {
        this.uow.Get<UserRepository>().Add(user);
        this.uow.Save();
        return this.StatusCode(200, new Response<Slot.Karma.API.Model.User>() { Obj = user, Status = 200, Message = "Your account was created." });
      }
      catch (Exception e) {
        logger.LogError(e, e.Message);
        return this.StatusCode(400, new Response<User>() { Obj = null, Status = 400, Message = e.Message });
      }
    }


  }
}
