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
  public class OfferController : BaseController {
    private readonly ILogger<OfferController> logger;
    private readonly AuthenticationManager userManager;

    public OfferController(ILogger<OfferController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list/{cid}")]
    public ActionResult<Response<List<Slot.Karma.API.Model.Offer>>> List(
      [FromRoute] Int64 cid,
      [FromQuery] Int32 skip, 
      [FromQuery] Int32 take,
      [FromQuery] String orderby, 
      [FromQuery] String dir,
      [FromQuery] String keyword) {
      IList<Slot.Karma.API.Model.Offer> records = new List<Slot.Karma.API.Model.Offer>() { 
        new Slot.Karma.API.Model.Offer() { Id=1, Name="Ben & Jerry's", Description="$0.50 off a cone or sundae!<br/>6-8pm today" },
        new Slot.Karma.API.Model.Offer() { Id=1, Name="Taco's Restaurant", Description="Free Appetizer with dinner order.  Limit 2<br/>6-8pm today" }
      };
      return this.StatusCode(200, new Response<IList<Slot.Karma.API.Model.Offer>>() { Obj = records, Status = 200, Message = "" });
    }

  }
}
