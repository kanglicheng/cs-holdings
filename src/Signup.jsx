import React from 'react';
import { createClient } from '@supabase/supabase-js'
import { api_url } from './supaConstants';

const supabase = createClient(api_url, process.env.REACT_APP_SUPABASE_ANON_KEY)

export const Signup = (props) => {


    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          })
          if(error){
            throw error;
          }
    }

    return (

        <div>
            <form>
                <h3>Create an account</h3>
                <label>Email </label>
                <input onChange={(e)=> setEmail(e.target.value)} type="text"/>

                <label>Password </label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password"/>
                <button onClick={handleSignup}>Sign up</button>
            </form>
        </div>

    )

}