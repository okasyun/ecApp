// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { SelectBox, PrimaryButton, TextInput } from "../components/UIkit";
// import { saveProduct } from "../reducks/products/operations";
// import { ImageArea, SetSizeArea } from "../components/Products";
// import { db } from "../firebase/index";

import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase/index";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations";
import { ImageArea, SetSizesArea } from "../components/Products";

// 商品説明とカテゴリーが表示しないエラー
const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split("/product/edit")[1];
  // idが空っぽじゃないなら
  if (id !== "") {
    id = id.split("/")[1];
  }
  // 分割代入
  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [images, setImages] = useState([]),
    [category, setCategory] = useState(""),
    [categories, setCategories] = useState([]),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(""),
    [sizes, setSizes] = useState([]);

  // 入ってきた文字列（event)をsetNameに渡す
  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

  // idが変わったとき実行
  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setDescription(data.description);
          setImages(data.images);
          setCategory(data.category);
          setGender(data.gender);
          setPrice(data.price);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("categories")
      // 数字の小さい順
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.id,
            name: data.name,
          });
        });
        setCategories(list);
      });
  }, []);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          minRows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          minRows={5}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリー"}
          options={categories}
          required={true}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"性別"}
          options={genders}
          required={true}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          minRows={1}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--small" />
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className="module-spacer--small" />
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  sizes,
                  images
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
