using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Slot.Karma.API.UnitOfWork.Repository;
using Slot.Karma.Web.API.Model;

namespace Slot.Karma.Web.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PassportController : BaseController {
    private readonly ILogger<PassportController> logger;
    private readonly AuthenticationManager userManager;

    public PassportController(ILogger<PassportController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }

    [HttpPost]
    [Route("login")]
    public ActionResult<Response<Boolean>> Login([FromForm] String username, [FromForm] string password) {
      Slot.Karma.API.Model.User record = this.uow.Get<UserRepository>().Login(username, password);
      if (record != null) {
        this.userManager.SignIn(this.HttpContext, record);
        return this.StatusCode(200, new Response<Boolean>() { Obj = true, Status = 200, Message = "Welcome" });
      }
      return this.StatusCode(400, new Response<Boolean>() { Obj = true, Status = 400, Message = "Invalid Username or Password" });
    }

    [HttpGet]
    [Route("whoami")]
    public ActionResult<Response<Object>> WhoAmI() {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      return claim==null ? 
        this.Unauthorized(new object()) :
        this.StatusCode(200, new Response<Object>() { Obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value), Status = 200, Message = "" });
    }

    [HttpPost]
    [Microsoft.AspNetCore.Authorization.Authorize]
    [Route("logout")]
    public ActionResult<Response<Boolean>> Logout() {
      this.userManager.SignOut(this.HttpContext);
      return this.StatusCode(200, new Response<Boolean>() { Obj = true, Status = 200, Message = "Goodbye" });
    }

  }
}
