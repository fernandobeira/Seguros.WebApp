using MongoDB.Bson;
using Seguros.WebApp.Models.Enums;

namespace Seguros.WebApp.Models;

public class Seguro
{
    public ObjectId Id { get; set; }
    public string? Seguradora { get; set; }
    public int NumeroApolice { get; set; }
    public List<Cobertura>? Coberturas { get; set; }
    public List<Beneficiario>? Benificiarios { get; set; }
    public DateTime DataAquisicaoApolice { get; set; }
    public decimal ValorPremio { get; set; }
    public Frequencia Frequencia { get; set; }
    public string? Porque { get; set; }
}
