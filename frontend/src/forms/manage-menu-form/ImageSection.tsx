import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ImageSection = () => {
    const { control, watch } = useFormContext();

    const existingImageUrl = watch('imageUrl');

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Dish Image</h2>
                <FieldDescription>
                    Upload an image that best represents the dish. 
                    This will be displayed on the menu to help customers identify the dish.
                </FieldDescription>
                
                <div className="flex flex-col gap-8 md:w-1/2">
                {existingImageUrl && (
                    <AspectRatio ratio={16/9} className="w-full">
                        <img src={existingImageUrl} 
                        alt="Current Dish Image" 
                        className="rounded-md object-cover h-full w-full" />
                    </AspectRatio>
                )}
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