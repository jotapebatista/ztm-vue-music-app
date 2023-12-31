<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_message }}
  </div>
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>

    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>

    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      >
      </vee-field>
      <ErrorMessage class="text-red-600" name="password" />
    </div>

    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="Portugal">Portugal</option>
        <option value="Spain">Spain</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
export default {
  name: 'RegisterForm',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:50|alpha_spaces',
        email: 'required|min:3|max:50|email',
        age: 'required|min_value:18|max_value:99',
        password: 'required|min:8|max:50|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:France',
        tos: 'tos'
      },
      userData: {
        country: 'Portugal'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_message: 'Please wait! Your account is being created.'
    }
  },
  methods: {
    async register(values) {
      console.log(values)
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_message = 'Please wait! Your account is being created.'
      let userCred = null

      try {
        userCred = await getAuth().createUserWithEmailAndPassword(values.email, values.password)
      } catch (error) {
        // Handle Firebase authentication errors
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.reg_alert_message = 'Email is already in use. Please choose a different one.'
            break
          case 'auth/invalid-email':
            this.reg_alert_message = 'Invalid email format. Please provide a valid email address.'
            break
          case 'auth/weak-password':
            this.reg_alert_message = 'Weak password. Please choose a stronger password.'
            break
          // Handle other error cases as needed
          default:
            this.reg_alert_message =
              'An error occurred during registration. Please try again later.'
        }
        this.reg_in_submission = false
        return
      }

      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_message = 'Success! Your account has been created.'

      console.log(userCred)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>