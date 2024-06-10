"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id?: string;
  errors?: Record<string, string[] | undefined>;
}
export const FormPickers = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const result = await unsplash.photos.getRandom({
          collectionIds: ["317009"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            {/* hidden input checkbox for form element to get image from  */}
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              readOnly
              disabled={pending}
              value={`${image.id}|${image.urls?.thumb}|${image.user?.name}|${image.links?.html}|${image.urls?.full}`}
            />
            <Image
              fill
              src={image.urls?.thumb}
              alt="Unsplash Image"
              className="object-cover rounded-sm"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links?.html!}
              target="_blank"
              className="
            opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50
            "
            >
              {image.user?.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
