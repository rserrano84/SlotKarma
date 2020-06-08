using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Slot.Karma.Web.API.Model
{
  public class AuthenticationManager
  {
    protected Newtonsoft.Json.JsonSerializerSettings JsonSettings = new Newtonsoft.Json.JsonSerializerSettings() {
      ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore,
      Formatting = Newtonsoft.Json.Formatting.None,
      Converters = { new Newtonsoft.Json.Converters.IsoDateTimeConverter() }
    };


    public AuthenticationManager(string connectionString)
    {
    }

    public async void SignIn(HttpContext httpContext, Slot.Karma.API.Model.User user) {
      var authProperties = new AuthenticationProperties {
        ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(1440),
        IsPersistent = true
      };
        ClaimsIdentity identity = new ClaimsIdentity(this.GetUserClaims(user), CookieAuthenticationDefaults.AuthenticationScheme);
      ClaimsPrincipal principal = new ClaimsPrincipal(identity);

      await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties);
    }

    public async void SignOut(HttpContext httpContext) {
      await httpContext.SignOutAsync();
    }

    private IEnumerable<Claim> GetUserClaims(Slot.Karma.API.Model.User user) {
      List<Claim> claims = new List<Claim>();
      claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
      claims.Add(new Claim(ClaimTypes.UserData, Newtonsoft.Json.JsonConvert.SerializeObject(user, this.JsonSettings)));
      return claims;
    }

  }
}
