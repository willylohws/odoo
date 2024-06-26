/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _lt } from "@web/core/l10n/translation";
import { useInputField } from "../input_field_hook";
import { standardFieldProps } from "../standard_field_props";

import { Component } from "@odoo/owl";

export class UrlField extends Component {
    setup() {
        useInputField({ getValue: () => this.props.value || "" });
    }

    get formattedHref() {
        let value = this.props.value;
        if (value && !this.props.websitePath) {
            const regex = /^((ftp|http)s?:\/)?\//i; // http(s)://... ftp(s)://... /...
            value = !regex.test(value) ? `http://${value}` : value;
        }
        return value;
    }
}

UrlField.template = "web.UrlField";
UrlField.props = {
    ...standardFieldProps,
    placeholder: { type: String, optional: true },
    text: { type: String, optional: true },
    websitePath: { type: Boolean, optional: true },
};

UrlField.displayName = _lt("URL");
UrlField.supportedTypes = ["char"];

UrlField.extractProps = ({ attrs }) => {
    return {
        text: attrs.text,
        websitePath: attrs.options.website_path,
        placeholder: attrs.placeholder,
    };
};

class FormUrlField extends UrlField {}
FormUrlField.template = "web.FormUrlField";

registry.category("fields").add("url", UrlField);
registry.category("fields").add("form.url", FormUrlField);
