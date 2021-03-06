<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="alert alert-danger mb-3" v-if="errors.length">
                    <ul class="mb-0">
                        <li v-for="error in errors">{{ error[0] }}</li>
                    </ul>
                </div>

                <div v-if="submitted && success">
                    <div class="alert alert-success">
                        {{ success }}
                    </div>
                    <div class="text-center">
                        <router-link to="/companies" class="btn btn-sm btn-primary">
                            <i class="fas fa-home"></i> Companies
                        </router-link>
                    </div>
                </div>

                <div class="card" v-else>
                    <div class="card-header">Edit Company</div>
                    <form @submit.prevent="submitForm">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.name }" name="name" placeholder="Name" v-model="company.name" />
                                <span class="invalid-feedback" role="alert" v-if="errors.name">
                                    <strong>{{ errors.name[0] }}</strong>
                                </span>
                            </div>

                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" v-bind:class="{ 'is-invalid' : errors.email }" name="email" placeholder="Email" v-model="company.email" />
                                <span class="invalid-feedback" role="alert" v-if="errors.email">
                                    <strong>{{ errors.email[0] }}</strong>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Logo</label>
                                        <input type="file" class="form-control" name="logo_file" id="logo_file" ref="logo_file" v-on:change="handleFileUpload" />
                                    </div>
                                </div>
                                <div class="col-md-4 text-right">
                                    <img :src="'/storage/' + company.logo" style="width: 100px; height: 100px;">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Website</label>
                                <input type="text" class="form-control" name="website" placeholder="Website" v-model="company.website" />
                            </div>
                        </div>
                        <div class="card-footer">
                            <input type="hidden" name="logo" v-model="company.logo" />
                            <router-link to="/companies" class="btn btn-danger">
                                <i class="fas fa-step-backward"></i> Cancel
                            </router-link>
                            <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                company: {},
                logo_file: '',
                submitted: false,
                errors: '',
                success: '',
            };
        },
        methods: {
            handleFileUpload() {
                this.logo_file = this.$refs.logo_file.files[0];
            },
            submitForm() {
                if(this.logo_file !== '') {
                    this.company.logo = this.logo_file;
                }

                //submit
                this.$http.post('/api/companies/' + this.$route.params.id,
                    {
                        'id': this.company.id,
                        'name': this.company.name,
                        'email': this.company.email,
                        'logo': this.company.logo,
                        'website': this.company.website,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
                    .then((response) => {
                        if(response.data.errors) {
                            this.success = '';
                            this.errors = response.data.errors;
                        }
                        else  {
                            this.company = {};
                            this.logo_file = '';
                            this.submitted = true;
                            this.errors = '';
                            this.success = response.data.success;
                        }
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                        console.log(error.response.data)
                    });
            }
        },
        mounted() {
            this.$http.get("/api/companies/" + this.$route.params.id)
                .then((response) => {
                    this.company = response.data;
                })
                .catch((error) => { console.log(error) })
        }
    }
</script>
