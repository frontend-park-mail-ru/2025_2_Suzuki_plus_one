import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '../../js/utils/validation.js'

class Signup {
    #parent
    #appInstance
    constructor(parent, appInstance) {
        this.#parent = parent
        this.#appInstance = appInstance
    }
    render() {
        const template = Handlebars.templates['Signup/Signup']
        this.#parent.innerHTML = template({})

        const form = this.#parent.querySelector('#signup-form')
        const usernameErrorDiv = this.#parent.querySelector('#usernameError')
        const emailErrorDiv = this.#parent.querySelector('#emailError')
        const passwordErrorDiv = this.#parent.querySelector('#passwordError')
        const confirmErrorDiv = this.#parent.querySelector('#confirmError')

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const username = form.querySelector('input[name="username"]').value
            const email = form.querySelector('input[name="email"]').value
            const password = form.querySelector('#password').value
            const confirmPassword =
                form.querySelector('#confirm-password').value

            const usernameError = validateUsername(username)
            const emailError = validateEmail(email)
            const passwordError = validatePassword(password)
            const confirmError =
                password !== confirmPassword ? 'Passwords do not match' : null

            usernameErrorDiv.textContent = usernameError || ''
            emailErrorDiv.textContent = emailError || ''
            passwordErrorDiv.textContent = passwordError || ''
            confirmErrorDiv.textContent = confirmError || ''

            if (usernameError || emailError || passwordError || confirmError) {
                return
            }

            try {
                const response = await fetch('/api/v1/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                })

                if (!response.ok) {
                    let errorMessage = 'An error occurred'
                    if (response.status === 400) {
                        errorMessage = 'Invalid input'
                    } else if (response.status === 409) {
                        errorMessage = 'User already exists'
                    }
                    throw new Error(errorMessage)
                }

                const data = await response.json()
                localStorage.setItem('token', data.token)

                this.#appInstance.loginUser()
            } catch (error) {
                confirmErrorDiv.textContent = error.message
            }
        })

        const toggleButtons = this.#parent.querySelectorAll('.toggle-password')
        const passwordInputs = [
            this.#parent.querySelector('#password'),
            this.#parent.querySelector('#confirm-password'),
        ]
        toggleButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const input = passwordInputs[index]
                const icon = btn.querySelector('svg')
                const isPassword = input.type === 'password'
                input.type = isPassword ? 'text' : 'password'
                icon.innerHTML = isPassword
                    ? `<path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>`
                    : `<path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>`
            })
        })
    }
}
export default Signup
