import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";


const DetailSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Dish Details</h2>
                <FieldDescription>
                    Enter the details of the dish you want to add to the menu.
                </FieldDescription>
            </div>
            <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                    <Field className="flex-1 md:max-w-[33%]" 
                    data-invalid={fieldState.invalid}>
                        <FieldLabel>Dish Name</FieldLabel>
                        <Input {...field} className="bg-white" placeholder="Delicious Pizza"/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}/>
            <Controller
                name='price'
                control={control}
                render={({ field, fieldState }) => (
                    <Field className="flex-1 md:max-w-[33%]"
                    data-invalid={fieldState.invalid}>
                        <FieldLabel>Delivery Price ($)</FieldLabel>
                        <Input type="number" {...field} className="bg-white" placeholder="15.00"/>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}/>
        </div>
    )
}

export default DetailSection;