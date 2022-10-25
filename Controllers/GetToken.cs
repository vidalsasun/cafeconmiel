using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using QuoHotel_for_Guests_SPA.Models;
using System;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Runtime.Serialization.Json;
using System.Text;

namespace cafeconmiel.Controllers
{
	public class GetToken : Controller
	{
		private readonly IConfiguration _config;
		private readonly IMemoryCache _cache;
		private ILogger<GetToken> _logger { get; }

		public GetToken(IConfiguration config, 
								IMemoryCache cache, 
								ILogger<GetToken> logger)
		{
			_config = config;
			_cache = cache;
			_logger = logger;
		}
		[HttpGet]
		public TokenModel Get()
		{
			try
			{
				var GuestDeskUrlToken = _config.GetValue<string>("GuestDeskUrlToken");
				var GuestDeskUser = _config.GetValue<string>("GuestDeskUser");
				var GuestDeskPass = _config.GetValue<string>("GuestDeskPass");
				var GuestDeskGrantType = _config.GetValue<string>("GuestDeskGrantType");
				var GuestDeskProviderCode = _config.GetValue<string>("GuestDeskProviderCode");
				var GuestDeskHotelCode = _config.GetValue<string>("GuestDeskHotelCode");

				using (var wbToken = new WebClient())
				{
					byte[] responseToken = wbToken.UploadValues(GuestDeskUrlToken, new NameValueCollection()
				{
					{"username" , GuestDeskUser },
					{"password" , GuestDeskPass },
					{"grant_type" , GuestDeskGrantType },
					{"providerCode" , GuestDeskProviderCode },
					{"hotelcode" , GuestDeskHotelCode }
				});
					string resultToken = Encoding.UTF8.GetString(responseToken);
					using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(resultToken)))
					{
						DataContractJsonSerializer QuoHotelForGuestTokenSerializer = new DataContractJsonSerializer(typeof(TokenModel));
						TokenModel tokenDataJSON = (TokenModel)QuoHotelForGuestTokenSerializer.ReadObject(ms);
						return tokenDataJSON;
					}
				}
			}
			catch (WebException ex)
			{
				String responseFromServer = ex.Message.ToString() + " ";
				if (ex.Response != null)
				{
					using (WebResponse response = ex.Response)
					{
						Stream dataRs = response.GetResponseStream();
						using (StreamReader reader = new StreamReader(dataRs))
						{
							responseFromServer += reader.ReadToEnd();
						}
					}
				}
				_logger.LogWarning(responseFromServer);
				return null;// StatusCode(Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError, responseFromServer).Value.ToString();
			}
		}
	}
}
