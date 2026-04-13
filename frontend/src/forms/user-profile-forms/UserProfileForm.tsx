import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import type { User } from "@/types";
import { useEffect } from "react";
import { Field, 
        FieldDescription, 
        FieldError, 
        FieldGroup, 
        FieldLabel } from "@/components/ui/field";

const formSchema = z.object({
    email: z.email().optional(),
    username: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    addressLine: z.string().min(1, "Address is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (data: UserFormData) => void;
    isLoading: boolean;
    currentUser: User;
    title?: string;
    buttonText?: string;
};

const UserProfileForm = ({
    onSubmit, 
    isLoading, 
    currentUser, 
    title="User Profile",
    buttonText="Submit"
}:Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser || { 
            email: '', 
            username: '', 
            city: '', 
            country: '', 
            addressLine: '' 
        },
    });

    useEffect(() => {
        if (currentUser) {
            form.reset(currentUser);
        }
    }, [currentUser, form]);

   return(
    <form id={`user-profile-form-${currentUser?._id}`} {...form} onSubmit={form.handleSubmit(onSubmit)}
    className="w-full max-w-[700px] mx-auto space-y-4 bg-gray-50 rounded-lg p-5 md:p-10">
        <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <FieldDescription>View & change your user info.</FieldDescription>
        </div>
        <FieldGroup>
            <Controller 
            name="email"
            control={form.control}
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} id={field.name} disabled className="bg-white"/>
                </Field>
            )}
            />
            <Controller 
            name="username"
            control={form.control}
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>User Name</FieldLabel>
                    <Input {...field} id={field.name} className="bg-white" placeholder="User Name"/>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
            />
            <div className="flex flex-col sm:flex-row gap-4">
                <Controller 
                name="addressLine"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                        <FieldLabel>Address Line</FieldLabel>
                        <Input {...field} id={field.name} className="bg-white" placeholder="Address Line"/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />
                <Controller 
                name="country"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                        <FieldLabel>Country</FieldLabel>
                        <Input {...field} id={field.name} className="bg-white" placeholder="Country"/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />  
                <Controller
                name="city"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                        <FieldLabel>City</FieldLabel>
                        <Input {...field} className="bg-white" placeholder="City"/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />
            </div>
            <div>
                <Field orientation="horizontal">
                    {isLoading ? (
                        <LoadingButton />
                    ) : (
                        <Button type="submit" className="bg-orange-500">
                            {buttonText}
                        </Button>
                    )}
                </Field>
            </div>
        </FieldGroup>
    </form>
   )
}

export default UserProfileForm;