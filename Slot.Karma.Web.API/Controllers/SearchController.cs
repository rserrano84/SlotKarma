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
  public class SearchController : BaseController {
    private readonly ILogger<SearchController> logger;
    private readonly AuthenticationManager userManager;

    public SearchController(ILogger<SearchController> logger, AuthenticationManager userManager) {
      this.logger = logger;
      this.userManager = userManager;
    }


    [Microsoft.AspNetCore.Authorization.Authorize]
    [HttpGet]
    [Route("list/{cid}")]
    public ActionResult<Response<List<VwSkReportData>>> Top(
      [FromRoute] ulong cid,
      [FromQuery] Int32 skip,
      [FromQuery] Int32 take,
      [FromQuery] String orderby,
      [FromQuery] String dir,
      [FromQuery] String type) {

      try {
        switch (type) {
          case "single":
            List<VwSkReportHighestSingle> single = (List<VwSkReportHighestSingle>)this.uow.Get<HighestSingleSearchRepository>().FindAll(s => s.CasinoId == cid, null).
              Skip(skip).Take(take).ToList();
            return this.StatusCode(200, new Response<IList<VwSkReportHighestSingle>>() { Obj = single, Status = 200, Message = "" });

          case "most":
            List<VwSkReportMostPlayed> most = (List<VwSkReportMostPlayed>)this.uow.Get<MostPlayedSearchRepository>().FindAll(s => s.CasinoId == cid, null).
              Skip(skip).Take(take).ToList();
            return this.StatusCode(200, new Response<IList<VwSkReportMostPlayed>>() { Obj = most, Status = 200, Message = "" });

          case "least":
            List<VwSkReportLeastPlayed> least = (List<VwSkReportLeastPlayed>)this.uow.Get<LeastPlayedSearchRepository>().FindAll(s => s.CasinoId == cid, null).
              Skip(skip).Take(take).ToList();
            return this.StatusCode(200, new Response<IList<VwSkReportLeastPlayed>>() { Obj = least, Status = 200, Message = "" });

          case "highest":
            List<VwSkReportHighestPayout> highest = (List<VwSkReportHighestPayout>)this.uow.Get<HighestPayoutSearchRepository>().FindAll(s => s.CasinoId == cid, null).
              Skip(skip).Take(take).ToList();
            return this.StatusCode(200, new Response<IList<VwSkReportHighestPayout>>() { Obj = highest, Status = 200, Message = "" });

          case "lowest":
            List<VwSkReportLowestPayout> lowest = (List<VwSkReportLowestPayout>)this.uow.Get<LowestPayoutSearchRepository>().FindAll(s => s.CasinoId == cid, null).
              Skip(skip).Take(take).ToList();
            return this.StatusCode(200, new Response<IList<VwSkReportLowestPayout>>() { Obj = lowest, Status = 200, Message = "" });

          default:
            return this.StatusCode(200, new Response<List<VwSkReportData>>() { Obj = new List<VwSkReportData>(), Status = 200, Message = type });
        }
      }
      catch (Exception e) {
        logger.LogError(e, e.Message);
        return this.StatusCode(400, new Response<List<VwSkReportData>>() { Obj = new List<VwSkReportData>(), Status = 400, Message = String.Format("Unable to load results") });
      }
    }
  }
}
