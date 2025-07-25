# coding=utf-8
# *** WARNING: this file was generated by pulumi-language-python. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import builtins as _builtins
from . import _utilities
import typing
# Export this package's modules as members:
from ._enums import *
from .provider import *
from .rest_api import *
from ._inputs import *
_utilities.register(
    resource_modules="""
[
 {
  "pkg": "aws-apigateway",
  "mod": "index",
  "fqn": "pulumi_aws_apigateway",
  "classes": {
   "aws-apigateway:index:RestAPI": "RestAPI"
  }
 }
]
""",
    resource_packages="""
[
 {
  "pkg": "aws-apigateway",
  "token": "pulumi:providers:aws-apigateway",
  "fqn": "pulumi_aws_apigateway",
  "class": "Provider"
 }
]
"""
)
