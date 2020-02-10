using CsvHelper.Configuration;

namespace KhalidAbuhakmeh.AspNetCore.Search.Models.Csv
{
    public class CapitalCitiesMapping : ClassMap<CapitalCityRecord>
    {
        public CapitalCitiesMapping()
        {
            Map(x => x.Id).Name("id");
            Map(x => x.City).Name("city");
            Map(x => x.CityAscii).Name("city_ascii");
            Map(x => x.Latitude).Name("lat");
            Map(x => x.Longitude).Name("lng");
            Map(x => x.Country).Name("country");
            Map(x => x.Population).Name("population");
            Map(x => x.Capital).Name("capital");
            Map(x => x.Iso2).Name("iso2");
            Map(x => x.Iso3).Name("iso3");
            Map(x => x.AdminName).Name("admin_name");

        }
    }

    public class CapitalCityRecord
    {
        public string Id { get; set; }
        public string City { get; set; }
        public string CityAscii { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Country { get; set; }
        public int? Population { get; set; }
        public string Capital { get; set; }
        public string Iso2 { get; set; }
        public string Iso3 { get; set; }
        public string AdminName { get; set; }
    }
}