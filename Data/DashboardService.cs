using IM.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Blazored.LocalStorage;
using System.Linq;
using System.Text;
using ImBlazorApp.Models;

namespace ImBlazorApp.Data
{
    public interface IDashboardService
    {
        Task<KpiData> GetKpi(string token);
        Task<List<Incident>> GetLast5Incidents(string token);
        Task<object> GetMostAssignedToUsers(string token);
        Task<List<Incident>> GetOldest5UnresolvedIncidents(string token);
        Task<KpiData> GetOverallWidget(string token);
    }

    public class DashboardService : IDashboardService
    {
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory clientFactory;
        private readonly ILocalStorageService localStorage;
        private readonly IUserService userService;
        private string baseUrl = "https://imwebapicore.azurewebsites.net/api";
        public DashboardService(IConfiguration _configuration, IHttpClientFactory _clientFactory, ILocalStorageService _localStorage, IUserService _userService)
        {
            configuration = _configuration;
            clientFactory = _clientFactory;
            localStorage = _localStorage;
            userService = _userService;
        }

        public async Task<KpiData> GetKpi(string token)
        {
            string loggedInUser = await userService.GetLoggedInUserId();
            var request = new HttpRequestMessage(HttpMethod.Get,
                baseUrl + "/Incidents/KPI?userId=" + loggedInUser);

            request.Headers.Add("Authorization", "Bearer " + token);

            var client = clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<KpiData>(responseStream);
            }
            else
            {
                return null;
            }
        }

        public async Task<KpiData> GetOverallWidget(string token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
               baseUrl + "/Incidents/OverallWidget");

            request.Headers.Add("Authorization", "Bearer " + token);

            var client = clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<KpiData>(responseStream);
            }
            else
            {
                return null;
            }
        }

        public async Task<List<Incident>> GetLast5Incidents(string token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                baseUrl + "/Incidents/Last5Incidents");

            request.Headers.Add("Authorization", "Bearer " + token);

            var client = clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<List<Incident>>(responseStream);
            }
            else
            {
                return null;
            }
        }

        public async Task<List<Incident>> GetOldest5UnresolvedIncidents(string token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                baseUrl + "/Incidents/Oldest5UnresolvedIncidents");

            request.Headers.Add("Authorization", "Bearer " + token);

            var client = clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<List<Incident>>(responseStream);
            }
            else
            {
                return null;
            }
        }

        public async Task<object> GetMostAssignedToUsers(string token)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                baseUrl + "/Incidents/MostAssignedToUsersIncidents");

            request.Headers.Add("Authorization", "Bearer " + token);

            var client = clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                return await JsonSerializer.DeserializeAsync<object>(responseStream);
            }
            else
            {
                return null;
            }
        }

    } //end of class
}
