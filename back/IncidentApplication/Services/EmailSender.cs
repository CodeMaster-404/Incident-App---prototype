
using IncidentApplication.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
namespace IncidentApplication.Services
{
    public enum WhichEmail
    {
        ConfirmEmail,
        ResetPassword,
        IncidentLogged
    }

    public class SendEmailTemplateData
    {
        [JsonProperty("verifyLink")]
        public string VeriyLink { get; set; }
        [JsonProperty("username")]
        public string Username { get; set; }
        [JsonProperty("incident_id")]
        public int Incident_Id { get; set; }
        [JsonProperty("incident_description")]
        public string Incident_Description { get; set; }
        [JsonProperty("incident_location")]
        public string Incident_Location { get; set; }
        [JsonProperty("incident_date_logged")]
        public string Incident_Date_Logged { get; set; }
    }

    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }

        public Task ExecuteSendEmail(ApplicationUser user, string email, object obj, WhichEmail whichEmail)
        {
            var client = new SendGridClient(_config["SendGrid:Key"]);
            var msg = new SendGridMessage();

            msg.SetFrom(new EmailAddress(_config["SendGrid:SenderEmail"], _config["SendGrid:SenderName"]));
            msg.AddTo(new EmailAddress(email, user.FirstName + " " + user.LastName));
            SendEmailTemplateData dynamicTemplateData = null;
            switch (whichEmail)
            {
                case WhichEmail.ConfirmEmail:
                    msg.SetTemplateId(_config["SendGrid:ConfirmEmailTransID"]);
                    dynamicTemplateData = new SendEmailTemplateData
                    {
                        VeriyLink = (string)obj
                    };
                    break;
                case WhichEmail.ResetPassword:
                    msg.SetTemplateId(_config["SendGrid:ConfirmEmailTransID"]);
                    dynamicTemplateData = new SendEmailTemplateData
                    {
                        VeriyLink = (string)obj
                    };
                    break;
                case WhichEmail.IncidentLogged:
                    msg.SetTemplateId(_config["SendGrid:IncidentLoggedTransID"]);
                    DateTime date = (DateTime)obj.GetType().GetProperty("Date_Logged").GetValue(obj, null);
                    dynamicTemplateData = new SendEmailTemplateData
                    {
                        Username = user.FirstName,
                        Incident_Id = (int)obj.GetType().GetProperty("Id").GetValue(obj, null),
                        Incident_Description = (string)obj.GetType().GetProperty("Description").GetValue(obj, null),
                        Incident_Location = (string)obj.GetType().GetProperty("Location").GetValue(obj, null),
                        Incident_Date_Logged = date.ToString("dd MMM yyyy")
                    };
                    break;
            }

            msg.SetTemplateData(dynamicTemplateData);

            return client.SendEmailAsync(msg);
        }

        public Task SendConfirmEmailAsync(ApplicationUser user, string email, string url)
        {
            return ExecuteSendEmail(user, email, url, WhichEmail.ConfirmEmail);
        }

        public Task SendRestPasswordEmailAsync(ApplicationUser user, string email, string url)
        {
            return ExecuteSendEmail(user, email, url, WhichEmail.ResetPassword);
        }

        public Task SendIncidentLoggedEmailAsync(ApplicationUser user, Incidents incident)
        {
            return ExecuteSendEmail(user, user.Email, incident, WhichEmail.IncidentLogged);
        }
    }
}
