// *** WARNING: this file was generated by pulumi-java-gen. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

package com.pulumi.awsapigateway.enums;

import com.pulumi.core.annotations.EnumType;
import java.lang.String;
import java.util.Objects;
import java.util.StringJoiner;

    @EnumType
    public enum IntegrationPassthroughBehavior {
        When_no_match("when_no_match"),
        When_no_templates("when_no_templates"),
        Never("never");

        private final String value;

        IntegrationPassthroughBehavior(String value) {
            this.value = Objects.requireNonNull(value);
        }

        @EnumType.Converter
        public String getValue() {
            return this.value;
        }

        @Override
        public java.lang.String toString() {
            return new StringJoiner(", ", "IntegrationPassthroughBehavior[", "]")
                .add("value='" + this.value + "'")
                .toString();
        }
    }
