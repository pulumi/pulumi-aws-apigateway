// *** WARNING: this file was generated by pulumi-java-gen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package com.pulumi.awsapigateway.enums;

import com.pulumi.core.annotations.EnumType;
import java.lang.String;
import java.util.Objects;
import java.util.StringJoiner;

    @EnumType
    public enum APIKeySource {
        HEADER("HEADER"),
        AUTHORIZER("AUTHORIZER");

        private final String value;

        APIKeySource(String value) {
            this.value = Objects.requireNonNull(value);
        }

        @EnumType.Converter
        public String getValue() {
            return this.value;
        }

        @Override
        public java.lang.String toString() {
            return new StringJoiner(", ", "APIKeySource[", "]")
                .add("value='" + this.value + "'")
                .toString();
        }
    }
