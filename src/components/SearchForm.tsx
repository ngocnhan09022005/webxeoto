import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSearchSchema, type CarSearch } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car } from "@shared/schema";

interface SearchFormProps {
  onSubmit: (data: CarSearch) => void;
  initialValues?: CarSearch;
}

export default function SearchForm({ onSubmit, initialValues }: SearchFormProps) {
  // Fetch data for dropdowns
  const { data: cars } = useQuery<Car[]>({ 
    queryKey: ['/api/cars'],
  });

  const form = useForm<z.infer<typeof carSearchSchema>>({
    resolver: zodResolver(carSearchSchema),
    defaultValues: {
      brand: initialValues?.brand || undefined,
      model: initialValues?.model || undefined,
      priceRange: initialValues?.priceRange || undefined,
      bodyType: initialValues?.bodyType || undefined,
    },
  });

  // Update form when initialValues change
  useEffect(() => {
    if (initialValues) {
      form.reset({
        brand: initialValues.brand,
        model: initialValues.model,
        priceRange: initialValues.priceRange,
        bodyType: initialValues.bodyType,
      });
    }
  }, [initialValues, form]);

  // Extract unique values for dropdowns
  const brands = cars 
    ? Array.from(new Set(cars.map(car => car.brand))).sort()
    : [];
  
  const models = cars && form.watch("brand")
    ? Array.from(new Set(cars
        .filter(car => car.brand === form.watch("brand"))
        .map(car => car.model)))
        .sort()
    : [];
  
  const bodyTypes = cars
    ? Array.from(new Set(cars.map(car => car.bodyType))).sort()
    : [];

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof carSearchSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Brand</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Brands">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Model</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!form.watch("brand") || form.watch("brand") === "All Brands"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All Models" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Models">All Models</SelectItem>
                  {models.map(model => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Price Range</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Any Price">Any Price</SelectItem>
                  <SelectItem value="$10,000 - $20,000">$10,000 - $20,000</SelectItem>
                  <SelectItem value="$20,000 - $30,000">$20,000 - $30,000</SelectItem>
                  <SelectItem value="$30,000 - $50,000">$30,000 - $50,000</SelectItem>
                  <SelectItem value="$50,000+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bodyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Body Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Types">All Types</SelectItem>
                  {bodyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Search Cars
        </Button>
      </form>
    </Form>
  );
}
