import React, { useState } from 'react'
import SideBar from '../ReusableComponents/SideBar'
import { toast } from 'react-toastify';
import axios from 'axios';

const RemoveFaculty = () => {
    const [regid, setRegid] = useState('');

    async function handleRemove(ev) {
        ev.preventDefault();
        const url = `/removeTeacher/${regid}`;
        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                toast.success("Remove Faculty Successful");
                setRegid('');
            } else {
                toast.error("Faculty Not Removed: " + response.data.error);
            }
        } catch (error) {
            console.error('Removal failed', error);
            toast.error("Faculty Not Removed: " + error.message);
        }
    }

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-grow p-3 '>
                <div className=' flex justify-center items-center flex-col h-full bg-gray-100'>
                    <div>
                        <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            Remove Faculty
                        </h2>

                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                        <div className='sm:p-10 sm:bg-white sm:rounded-lg sm:border sm:mx-auto sm:w-full sm:max-w-lg shadow-md'>

                            <form className="space-y-6" onSubmit={handleRemove}>
                                <div>
                                    <label htmlFor="regid" className="block text-lg font-medium leading-6 text-gray-900">
                                        Registration ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={regid}
                                            onChange={ev => setRegid(ev.target.value)}
                                            id="regid"
                                            name="regid"
                                            type="regid"
                                            placeholder='enter regid'
                                            autoComplete="regid"
                                            required
                                            className="p-2 pl-3 block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="mt-5 text-md font-medium flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Remove Faculty
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveFaculty