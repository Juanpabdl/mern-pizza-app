import { Button } from "./ui/button";

type CategorySelectorProps = {
    selectedCategory: string;
    handleSelect: (category: string) => void;
};

const CategorySelector = ({ selectedCategory, handleSelect }: CategorySelectorProps) => {
    const categories = ["Pizza", "Pasta", "Salads", "Desserts", "Drinks", "Sides", "Specials"];

    return(
        <div className="space-y-3 text-center">
            <h2>Looking for something?</h2>
            <div className="flex flex-wrap space-x-0.5 space-y-0.5">
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleSelect(category)}
                        variant={selectedCategory === category ? "default" : "outline"}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    )

}

export default CategorySelector;