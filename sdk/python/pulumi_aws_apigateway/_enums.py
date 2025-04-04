# coding=utf-8
# *** WARNING: this file was generated by pulumi-language-python. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import builtins
import builtins
from enum import Enum

__all__ = [
    'APIKeySource',
    'IntegrationConnectionType',
    'IntegrationPassthroughBehavior',
    'IntegrationType',
    'Method',
    'RequestValidator',
]


class APIKeySource(builtins.str, Enum):
    HEADER = "HEADER"
    AUTHORIZER = "AUTHORIZER"


class IntegrationConnectionType(builtins.str, Enum):
    INTERNET = "INTERNET"
    VP_C_LINK = "VPC_LINK"


class IntegrationPassthroughBehavior(builtins.str, Enum):
    WHEN_NO_MATCH = "when_no_match"
    WHEN_NO_TEMPLATES = "when_no_templates"
    NEVER = "never"


class IntegrationType(builtins.str, Enum):
    AWS = "aws"
    AWS_PROXY = "aws_proxy"
    HTTP = "http"
    HTTP_PROXY = "http_proxy"
    MOCK = "mock"


class Method(builtins.str, Enum):
    ANY = "ANY"
    GET = "GET"
    PUT = "PUT"
    POST = "POST"
    DELETE = "DELETE"
    PATCH = "PATCH"
    OPTIONS = "OPTIONS"
    HEAD = "HEAD"


class RequestValidator(builtins.str, Enum):
    ALL = "ALL"
    PARAM_S_ONLY = "PARAMS_ONLY"
    BOD_Y_ONLY = "BODY_ONLY"
