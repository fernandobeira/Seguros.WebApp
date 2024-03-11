using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Seguros.WebApp.Models;

namespace Seguros.WebApp.Controllers;

public class HomeController : Controller
{
    private readonly SegurosContext _context;
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, SegurosContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult SaveProgress([FromBody] Seguro model)
    {
        try
        {
            if (ModelState.IsValid)
            {
                int numeroApolice = model.NumeroApolice;

                var data = _context.Seguros.FirstOrDefault(r => r.NumeroApolice.Equals(numeroApolice));

                if (data != null)
                {
                    data.Seguradora = model.Seguradora;
                    data.NumeroApolice = model.NumeroApolice;
                    data.Coberturas = model.Coberturas;
                    data.Benificiarios = model.Benificiarios;
                    data.DataAquisicaoApolice = model.DataAquisicaoApolice;
                    data.ValorPremio = model.ValorPremio;
                    data.Frequencia = model.Frequencia;
                    data.Porque = model.Porque;

                    _context.SaveChanges();
                }
                else
                {
                    _context.Add(model);
                    _context.SaveChanges();
                }

            }

            return Ok(model);

        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
