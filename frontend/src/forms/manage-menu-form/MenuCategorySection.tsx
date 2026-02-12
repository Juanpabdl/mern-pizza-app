import { useFormContext, Controller } from "react-hook-form";
import { Field, FieldError, FieldDescription } from "@/components/ui/field";
import CategoryCheckbox from "./CategoryCheckbox";

const MenuCategorySection = () => {
    const {control} = useFormContext();
    const categoryList = ["Pizza", "Pasta", "Salads", "Desserts", "Drinks", "Sides", "Specials"];

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Dish Categories</h2>
                <FieldDescription>
                    Select one or more categories that best describe the dish.
                </FieldDescription>
                <Controller
                    name='category'
                    control={control}
                    render={({field, fieldState})=>(
                        <Field data-invalid={fieldState.invalid}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                            {categoryList.map((categoryItem) => (
                                <div key={categoryItem} >
                                    <CategoryCheckbox category={categoryItem} field={field} />
                                </div>
                            ))}
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>
        </div>
    )
}

export default MenuCategorySection;