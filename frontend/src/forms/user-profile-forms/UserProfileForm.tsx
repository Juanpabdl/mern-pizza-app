import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import type { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.email().optional(),
    username: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    addressLine: z.string().min(1, "Address is required"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (data: UserFormData) => void;
    isLoading: boolean;
    currentUser: User;
};

const UserProfileForm = ({onSubmit, isLoading, currentUser}:Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: '', city: '', country: '', addressLine: '' }, //currentUser
    });

    useEffect(() => {
        if(currentUser){
            form.reset(); //form.reset(currentUser);
        }
    }, [currentUser, form]);

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4 bg-gray-50 rounded-lg p-5 md:p-10">
                <div className="space-y-1 mb-4">
                    <h2 className="text-xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        View and change your profile info. here!
                    </FormDescription>
                </div>
                <FormField control={form.control} 
                name="email" 
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} disabled className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField control={form.control} 
                name="username" 
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />
                {/* Address Fields */}
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} 
                    name="addressLine" 
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Address Line</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField control={form.control} 
                    name="country" 
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField control={form.control} 
                    name="city" 
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-orange-500">
                        Submit
                    </Button>
                )}
            </form>
        </Form>
    )
}

export default UserProfileForm;