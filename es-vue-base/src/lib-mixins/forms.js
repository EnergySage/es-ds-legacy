import { validationMixin } from 'vuelidate';

export default {
    mixins: [validationMixin],
    data() {
        return {
            submitInProgress: false,
            formMsg: '',
            formMsgVariant: 'danger',
        };
    },
    computed: {
        isSubmitInProgress() {
            return this.submitInProgress;
        },
        /**
        * @returns { Object } structure that's easy to use for form validation
        *
        * Shape of output will match validators defined in the validations
        * attribute of a component. For example if your validations object looks like:
        *
        * validations: {
        *     form: {
        *         password: {
        *             [vuelidateKeys.REQUIRED]: vuelidateRequired,
        *             [vuelidateKeys.MIN_LENGTH]: vuelidateMinLength(8),
        *             [vuelidateKeys.HAS_NUMBER]: vuelidateHasNumber,
        *             [vuelidateKeys.HAS_SPECIAL_CHARACTER]: vuelidateHasSpecialCharacter,
        *             [vuelidateKeys.HAS_UPPERCASE_LETTER]: vuelidateHasUppercaseLetter,
        *             [vuelidateKeys.HAS_LOWERCASE_LETTER]: vuelidateHasLowercaseLetter,
        *         },
        *     },
        * },
        *
        * Then the resulting formErrors (if the field is invalid) will look something like:
        *
        * {
        *     password: [
        *         'required',
        *         'minLength',
        *         'hasNumber',
        *         'hasSpecialCharacter',
        *         'hasUppercaseLetter',
        *         'hasLowercaseLetter',
        *     ]
        * }
        *
        * Only validators returning "false" will show up in the resulting list.
        * So if the field is valid, the result would be:
        *
        * {
        *     password: [],
        * }
        */
        formErrors() {
            const formFields = this.getFields(this.$v.form);
            const formFieldErrors = formFields.reduce((formObj, item) => {
                // eslint-disable-next-line no-param-reassign
                formObj[item.name] = this.getFields(item.obj, 'isValid')
                    .filter((i) => !i.isValid)
                    .map((j) => j.name);
                return formObj;
            }, {});
            return formFieldErrors;
        },
    },
    methods: {
        validateState(name) {
            // Check that given field has key in validators object
            const fieldHasValidators = this.$v.form && this.$v.form[name];
            if (!fieldHasValidators) {
                return null;
            }
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        // eslint-disable-next-line max-len
        showFormError(text = 'The server responded with an error and we were unable to complete your request. Please try again') {
            this.formMsgVariant = 'danger';
            this.formMsg = text;
        },
        showFormSuccess(text = 'Saved Successfully') {
            this.formMsgVariant = 'success';
            this.formMsg = text;
        },
        startSubmit() {
            this.formMsg = '';
            this.submitInProgress = true;
        },
        stopSubmit() {
            this.submitInProgress = false;
        },
        getFields(obj, valueKey = 'obj') {
            return Object.keys(obj)
                .filter((name) => !name.startsWith('$'))
                .map((name) => ({ name, [valueKey]: obj[name] }));
        },
    },
};
