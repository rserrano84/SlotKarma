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
  public class Password {
    public String password { get; set; }
  }

   [ApiController]
  [Route("api/[controller]")]
  public class PasswordController : BaseController {
    private readonly ILogger<PasswordController> logger;

    public PasswordController(ILogger<PasswordController> logger) {
      this.logger = logger;
    }

    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpPut]
    [Route("change")]
    public ActionResult<Response<Boolean>> Change([FromBody] Password data) {
      Claim claim = this.HttpContext.User.FindFirst(ClaimTypes.UserData);
      if (claim != null) {
        Slot.Karma.API.Model.User user = Newtonsoft.Json.JsonConvert.DeserializeObject<Slot.Karma.API.Model.User>(claim.Value);
        user.Pass = data.password;
        this.uow.Get<UserRepository>().ChangePassword(user);
        this.uow.Save();
        return this.StatusCode(200, new Response<Object>() { Obj = true, Status = 200, Message = "Your password was changed" });
      }
      return this.StatusCode(400, new Response<Object>() { Obj = true, Status = 200, Message = "We were unable to change your password.  Please try again." });
    }

    [HttpPost]
    [Route("reset/{email}")]
    public ActionResult<Response<Boolean>> Reset([FromRoute] string email) {
      return this.StatusCode(200, new Response<Object>() { Obj = true, Status = 200, Message = String.Format("An email to {0} was sent with the reset code", email) });
    }

  }
}
