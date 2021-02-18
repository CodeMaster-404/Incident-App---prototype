using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IncidentApplication.Models
{
    public class Payload<T>
    {
        public T Data { get; set; }

        public Payload(T data)
        {
            Data = data;
        }
    }
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public Payload<T> Payload { get; set; }
        public string Message { get; set;}
        public int Error_code { get; set; }

        public ApiResponse(string message)
        {
            Success = true;
            Payload = null;
            Message = message;
        }

        public ApiResponse(Payload<T> payload, string message)
        {
            Success = true;
            Payload = payload;
            Message = message;
        }

        public ApiResponse(int error_code, string message)
        {
            Success = false;
            Error_code = error_code;
            Message = message;
        }
    }
}
