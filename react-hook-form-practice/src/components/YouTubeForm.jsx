import { useEffect } from "react";
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";

export const YouTubeForm = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            age: 0,
            dob: null,
            channel: "",
            social: {
                linkedin: "",
                github: "",
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: "" }],
        }
    });
    const {register, control, handleSubmit, formState, watch, getValues, setValue} = form;

    const {errors, touchedFields, dirtyFields, isDirty, isValid} = formState;

    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control,
    });

    const onSubmit = (data) => {
        console.log("form submitted", data);
    };

    const onError = (error) => {
        console.log("Submit error: ", error)
    }

    const handleSetValue = () => {
        setValue("username", "", {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    // useEffect(() => {
    //     const subscription = watch((value) =>
    //         console.log(value)
    //     );
    //     return () => subscription.unsubscribe();
    // }, [watch]);

    // console.log(watch("username"));
    // console.log(watch(["email", "username"]));
    // console.log(watch());

    // console.log(touchedFields);
    // console.log(dirtyFields);
    console.log("Dirty: ", isDirty);
    console.log("Valid: ", isValid);

    return (
        <div>
            <h1>YouTube Form</h1>

            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" {...register("age", {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: "Age is required"
                        },
                    })} />
                    <p className={"error"}>{errors.age?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" id="dob" {...register("dob", {
                        valueAsDate: true,
                        required: {
                            value: true,
                            message: "Date of birth is required"
                        },
                    })} />
                    <p className={"error"}>{errors.dob?.message}</p>
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

                <div className="form-control">
                    <label htmlFor="linkedin">Linkedin</label>
                    <input type="text" id="linkedin" {...register("social.linkedin", {
                        disabled: watch("channel") === "",
                    })} />
                </div>

                <div className="form-control">
                    <label htmlFor="github">GitHub</label>
                    <input type="text" id="github" {...register("social.github")} />
                </div>

                <div className="form-control">
                    <label htmlFor="primary-phone">Primary Phone</label>
                    <input type="text" id="primary-phone" {...register("phoneNumbers[0]")} />
                </div>

                <div className="form-control">
                    <label htmlFor="secondary-phone">Secondary Phone</label>
                    <input type="text" id="secondary-phone" {...register("phoneNumbers.1")} />
                </div>

                <div>
                    <label>List of Phone Numbers</label>
                    <div>
                        {fields.map((field, index) => (
                        <div key={field.id} className="form-control">
                            <input
                            type="tel"
                            placeholder="Phone number"
                            {...register(`phNumbers.${index}.number`)}
                            />

                            {index > 0 && (
                            <button
                                type="button"
                                onClick={() => remove(index)}
                            >
                                Remove Phone Number
                            </button>
                            )}
                        </div>
                        ))}

                        <button
                        type="button"
                        onClick={() => append({ number: "" })}
                        >
                        Add Phone Number
                        </button>
                    </div>
                </div>
{/* 
                <button type="button" onClick={() => console.log("Get Values", getValues())}>Get Values</button>
                <button type="button" onClick={() => console.log(getValues("username"))}>Get Username Value</button>
                <button type="button" onClick={() => console.log(getValues(["username", "email"]))}>Get Username and Email Values</button> */}
                {/* <button type="button" onClick={handleSetValue}>Set Username</button> */}

                <button type="submit" disabled={!isDirty || !isValid}>Submit</button>
            </form>
            <DevTool control={control}/>
        </div>
    )
}