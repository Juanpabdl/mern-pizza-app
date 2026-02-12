import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ImageSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Dish Image</h2>
                <FieldDescription>
                    Upload an image that best represents the dish. 
                    This will be displayed on the menu to help customers identify the dish.
                </FieldDescription>
                
                <div className="flex flex-col gap-8 w-1/2">
                    <Controller
                    name='imageFile'
                    control={control}
                    render={({field, fieldState})=>(
                        <Field data-invalid={fieldState.invalid}>
                            <Input 
                            type="file" 
                            accept=".jpg, .jpeg, .png" 
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                field.onChange(file);
                            }} className="bg-white my-3" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}/>
                    {/*<img src={'ola'} alt="Placeholder Dish" className="w-48 h-48 object-cover rounded-md"/>*/}
                </div>
            </div>
        </div>
    )
}

export default ImageSection;