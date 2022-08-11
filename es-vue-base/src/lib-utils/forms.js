import { validationMixin } from 'vuelidate';

export default {
    mixins: [validationMixin],
    data() {
        return {
            submitInProgress: false,
            showFooterMsg: false,
            formMsg: '',
            formMsgVariant: 'danger',
        };
    },
    computed: {
        isSubmitInProgress() {
            return this.submitInProgress;
        },
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        // eslint-disable-next-line max-len
        showFormError(text = 'We were unable to complete your request. Please fix the errors highlighted above and try again.') {
            this.formMsgVariant = 'danger';
            this.formMsg = text;
        },
        showFormSuccess(text = 'Saved Successfully') {
            this.formMsgVariant = 'success';
            this.formMsg = text;
        },
        startSubmit() {
            this.submitInProgress = true;
            this.showFooterMsg = false;
        },
        stopSubmit() {
            this.submitInProgress = false;
        },
    },
};