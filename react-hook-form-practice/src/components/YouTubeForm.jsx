import {useForm} from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
    const form = useForm();
    const {register, control, handleSubmit} = form;

    const onSubmit = (data) => {
        console.log("form submitted", data);
    };

    return (
        <div>
            <h1>YouTube Form</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required"
                    },
                })} /*name={name} ref={ref} onChange={onChange} onBlur={onBlur}*/ />

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Username is required"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email address is required"
                    }
                })} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: {
                        value: true,
                        message: "Username is required"
                    },
                })} />

                <button type="submit">Submit</button>
            </form>
            <DevTool control={control}/>
        </div>
    )
}