import {useForm} from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            channel: ""
        }
    });
    const {register, control, handleSubmit, formState} = form;

    const {errors} = formState;
    console.log(formState);

    const onSubmit = (data) => {
        console.log("form submitted", data);
    };

    return (
        <div>
            <h1>YouTube Form</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        },
                    })} />
                    <p className={"error"}>{errors.username?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Email address is required"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid Email Address"
                        },
                        validate: {
                            notAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== 'admin@example.com' || "Enter another email address"
                                );
                            },
                            notBlacklist: (fieldValue) => {
                                return (
                                    !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                                )
                            }
                        }
                    })} />
                    <p className={"error"}>{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" {...register("channel", {
                        required: {
                            value: true,
                            message: "Channel is required"
                        },
                    })} />
                    <p className={"error"}>{errors.channel?.message}</p>
                </div>

                <button type="submit">Submit</button>
            </form>
            <DevTool control={control}/>
        </div>
    )
}