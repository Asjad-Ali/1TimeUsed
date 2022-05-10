import { ref, watch, computed, onMounted } from "vue";
import compressImage from "../composables/useImageCompression";
import { useRouter } from "vue-router";
import { useProductStore } from "src/stores/products.store";
import { useCategoryStore } from "../stores/categories.store";

export default function useAddProduct() {
  const router = useRouter();
  const imageError = ref(null);
  const productStore = useProductStore();
  const productForm = ref(null);
  const categoryStore = useCategoryStore();
  const stepper = ref("");


  const product = ref({
    title: "",
    category_id: "",
    neighborhood: "Johar Town, Lahore",
    sub_category_id: "",
    price: "5000",
    color: "All",
    purchase_price: 0,
    discount: 0,
    current_stock: 1,
    description: "This is a A+ Quality Product and up to 50% off on Every Item",
    images: [],
    condition: "used",
    latitude: "31.4697",
    longitude: "74.2728",
    discountTil: "",
    brand: "Gul Ahmad",
    size: "6 Meters",
    purpose: "Rental",
  });

  onMounted(() => {
    if (productStore.selectedProductForEdit) {
      product.value = productStore.selectedProductForEdit
      categoryStore.loadSubCategory(product.value.category_id);
    }
    categoryStore.loadCategories();
  });

  watch(product.value, (current) => {
    if (productStore.selectedProductForEdit) {
      imageError.value = null;
    } else {
      if (!current.images.length) {
        imageError.value = "At least one image must be uploaded";
      } else {
        imageError.value = null;
      }
    }
  });

  const goToNextStep = () => {
    productForm.value.validate().then((success) => {
      if (success && (product.value.images.length || product.value.gallery.length)) {
        stepper.value.next();
      }
    });
  };

  const loadSubCategory = () => {
    categoryStore.loadSubCategory(product.value.category_id);
    product.value.sub_category_id = "";
  };

  const removeOldImage = (index, path) => {
    console.log("Image Index", index, path)
    product.value.gallery.splice(index, 1)
  }

  const submitForm = async () => {
    let response;
    if (productStore.selectedProductForEdit) {
      response = await productStore.updateProduct(product.value);
    } else {
      response = await productStore.addMyProduct(product.value);
    }

    if (response.status == 200) {
      router.push("/sell");
    }
  };

  const setFiles = async (files) => {
    const compressedImages = [];

    for (let i = 0; i < files.length && i < 10; i++) {
      compressedImages[i] = await compressImage(files[i]);
    }
    product.value.images = compressedImages;
  };

  return {
    productForm,
    product,
    imageError,
    formValidated: computed(() => productForm.value && productForm.value.validate()),
    goToNextStep,
    loadSubCategory,
    submitForm,
    setFiles,
    stepper,
    removeOldImage
  }
}
