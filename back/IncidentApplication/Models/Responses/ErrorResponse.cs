﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IncidentApplication.Models.Responses
{
    public class ErrorResponse
    {
        public int Code { get; set; }
        public string Message { get; set; }
    }
}
