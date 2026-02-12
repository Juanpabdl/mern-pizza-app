import type { FieldValues, ControllerRenderProps } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    category: string;
    field: ControllerRenderProps<FieldValues, "category">;
}
const CategoryCheckbox = ({category, field}: Props) => {
    return (
        <div className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <Checkbox id={category} {...field} className="bg-white h-7 w-7 rounded-sm"
            checked={field.value.includes(category)}
            onCheckedChange={(checked) => {
                if (checked) {
                field.onChange([...field.value, category]);
                } else {
                field.onChange(
                    field.value.filter((value: string) => value !== category)
                );
                }
            }}
            />
            <FieldLabel htmlFor={category} className="text-sm font-medium text-gray-700">
                {category}
            </FieldLabel>
        </div>
    )
}

export default CategoryCheckbox;