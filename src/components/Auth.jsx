import React from 'react'
import { supabase } from '../supabaseClient'
import { useState, useEffect } from 'react'

export default function Auth() {

    let cnt = 0;

    const [user, setUser] = useState([])
    const [text, setText] = useState('')

    //for adduser

    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    useEffect(() => {

        const channel = supabase
          .channel('public:users') // Replace 'your_table_name'
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'users' }, // Listen for all events on your table
            (payload) => {
              console.log('Change received!', payload);
              
              fetchUser();
            }
          )
          .subscribe();

          fetchUser();
        // Cleanup: Unsubscribe when the component unmounts
        return () => {
          channel.unsubscribe();
        };
      }, []);

    useEffect(() => {

        console.log(user)


    }, [user])

    const fetchUser = async () => {

        const { data, error } = await supabase.from('users').select('*')

        try {

            if (error) {

                console.log(error)

            } else {

                setUser(data)

                console.log('Fetch User complete!')

            }

        } catch (error) {

            console.error(error);

        }

    }

    const addUser = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase

            .from('users')

            .insert([
                { name: name, ages: age },
            ])

            .select('*');

        if (error) {

            console.error('Error adding user:', error.message);
            setText(error)

        } else {

            console.log('User added successfully');
            setText('User added successfully')

            setName('')
            setAge('')

            fetchUser();
        }
    };

    const deleteUser = async (id) => {

        const { error } = await supabase.from('users').delete().eq('id', id);

        if (error) {

            console.error(error);

        } else {

            console.log('Delete User Complete!')
            setText('Delete User Complete!')

            fetchUser();

        }

    }

    return (
        <>
            <form onSubmit={addUser}>

                <input type="text"

                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}

                /><br />

                <input type="number"

                    placeholder='age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}

                /><br /><br />

                <input type="submit" value={'add'} /><br />

                <br />
                <b style={{ color: 'red' }}>{text}</b>

            </form>

            {user.map((userData) => {

                cnt += 1

                return (
                    <p key={userData.id}>  {cnt}: {userData.name} {userData.ages}
                        <button onClick={() => deleteUser(userData.id)}> Delete </button></p>
                )

            }) || 'Loading...'}



        </>
    )
}
