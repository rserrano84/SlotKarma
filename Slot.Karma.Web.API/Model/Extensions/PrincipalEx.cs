using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;

namespace Slot.Karma.Web.API.Model.Extensions {
  public static class PrincipalEx {
    public static void AddUpdateClaim(
      this IPrincipal currentPrincipal, 
      HttpContext httpContext, 
      AuthenticationManager userManager, 
      Slot.Karma.API.Model.User user, 
      string key, string value) {

      var identity = currentPrincipal.Identity as ClaimsIdentity;
      if (identity == null)
        return;

      // check for existing claim and remove it
      var existingClaim = identity.FindFirst(key);
      if (existingClaim != null)
        identity.RemoveClaim(existingClaim);

      // add new claim
      identity.AddClaim(new Claim(key, value));
      userManager.SignOut(httpContext);
      userManager.SignIn(httpContext, user);
    }

    public static string GetClaimValue(this IPrincipal currentPrincipal, string key) {
      var identity = currentPrincipal.Identity as ClaimsIdentity;
      if (identity == null)
        return null;

      var claim = identity.Claims.FirstOrDefault(c => c.Type == key);
      return claim.Value;
    }
  }
}
