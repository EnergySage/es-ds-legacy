<template>
    <div class="dropdown-cta-right">
        <es-nav-bar-link
            class="d-block cta-link text-gray-900 text-decoration-none"
            :href="link"
            :target="newTab ? '_blank' : null"
            :title="name">
            <img
                :id="graphicId"
                class="featured-article-image mb-100 w-100 rounded"
                :alt="imageAlt"
                loading="lazy"
                :src="imageUrl">
            <div class="eyebrow mb-50 link-name">
                {{ eyebrow }}
            </div>

            <p class="font-weight-bold link-subheading">
                {{ name }}
            </p>
        </es-nav-bar-link>
    </div>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';

export default {
    name: 'EsNavBarFeaturedArticle',
    components: {
        EsNavBarLink,
    },
    props: {
        eyebrow: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
            default: '',
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    computed: {
        graphicId() {
            return this.name.replace(/\s/g, '-').replace(/[^a-zA-Z]/g, '');
        },
    },
};
</script>
