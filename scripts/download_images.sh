#!/bin/bash

# Base URL for image service
# using loremflickr for context-aware placeholders
BASE_URL="https://loremflickr.com"

# Create directories
mkdir -p public/images/homepage
mkdir -p public/images/budaya/adat
mkdir -p public/images/budaya/kesenian
mkdir -p public/images/budaya/aksara
mkdir -p public/images/budaya/arsitektur
mkdir -p public/images/budaya/kuliner
mkdir -p public/images/budaya/pakaian/ulos
mkdir -p public/images/budaya/bahasa
mkdir -p public/images/fakta

# Function to download image
# Usage: download_image "path/to/file.jpg" "width" "height" "keywords"
download_image() {
    local filepath="public/$1"
    local width=$2
    local height=$3
    local keywords=$4
    
    if [ -f "$filepath" ]; then
        echo "File $filepath already exists. Skipping..."
    else
        echo "Downloading $filepath ($keywords)..."
        # Add random param to avoid duplicates for same keywords
        curl -L -s -o "$filepath" "$BASE_URL/$width/$height/$keywords?random=$RANDOM"
    fi
}

echo "Starting image download..."

# --- Homepage Cards ---
download_image "images/homepage/card-marga.jpg" 600 400 "batak,people"
download_image "images/homepage/card-aksara.jpg" 600 400 "ancient,script"
download_image "images/homepage/card-adat.jpg" 600 400 "indonesia,ceremony"
download_image "images/homepage/card-kesenian.jpg" 600 400 "traditional,dance"
download_image "images/homepage/card-arsitektur.jpg" 600 400 "traditional,house"
download_image "images/homepage/card-kuliner.jpg" 600 400 "indonesia,food"

# --- Homepage Hero ---
download_image "images/homepage/hero-lake-toba.jpg" 1920 1080 "lake,toba,landscape"
download_image "images/homepage/hero-tortor.jpg" 1920 1080 "batak,dance"
download_image "images/homepage/hero-pustaha.jpg" 1920 1080 "ancient,book"

# --- Budaya Categories ---
download_image "images/budaya/adat/card-adat.jpg" 800 600 "batak,wedding"
download_image "images/budaya/kesenian/card-kesenian.jpg" 800 600 "batak,music"
download_image "images/budaya/aksara/card-aksara.jpg" 800 600 "manuscript"
download_image "images/budaya/arsitektur/card-arsitektur.jpg" 800 600 "wooden,house"
download_image "images/budaya/kuliner/card-kuliner.jpg" 800 600 "spicy,food"
download_image "images/budaya/pakaian/card-pakaian.jpg" 800 600 "traditional,fabric"
download_image "images/budaya/bahasa/card-bahasa.jpg" 800 600 "dictionary"

# --- Kuliner ---
download_image "images/budaya/kuliner/arsik.jpg" 800 600 "fish,dish"
download_image "images/budaya/kuliner/saksang.jpg" 800 600 "meat,dish"
download_image "images/budaya/kuliner/dali-ni-horbo.jpg" 800 600 "cheese,tofu"
download_image "images/budaya/kuliner/naniura.jpg" 800 600 "raw,fish"
download_image "images/budaya/kuliner/dengke-mas.jpg" 800 600 "gold,fish"
download_image "images/budaya/kuliner/natinombur.jpg" 800 600 "grilled,fish"
download_image "images/budaya/kuliner/tuak.jpg" 800 600 "palm,wine"
download_image "images/budaya/kuliner/lappung.jpg" 800 600 "traditional,snack"
download_image "images/budaya/kuliner/lomang.jpg" 800 600 "bamboo,rice"
download_image "images/budaya/kuliner/ombus-ombus.jpg" 800 600 "steamed,cake"
download_image "images/budaya/kuliner/andaliman.jpg" 800 600 "pepper,spice"
download_image "images/budaya/kuliner/nira-aren.jpg" 800 600 "palm,tree"

# --- Arsitektur ---
download_image "images/budaya/arsitektur/ruma-bolon-exterior.jpg" 800 600 "batak,house,exterior"
download_image "images/budaya/arsitektur/ruma-bolon-interior.jpg" 800 600 "wooden,interior"
download_image "images/budaya/arsitektur/ruma-bolon-ornamen.jpg" 800 600 "carving,wood"
download_image "images/budaya/arsitektur/sopo-exterior.jpg" 800 600 "rice,barn"
download_image "images/budaya/arsitektur/sopo-function.jpg" 800 600 "gathering,people"
download_image "images/budaya/arsitektur/siwaluh-jabu-exterior.jpg" 800 600 "long,house"
download_image "images/budaya/arsitektur/siwaluh-jabu-interior.jpg" 800 600 "large,room"
download_image "images/budaya/arsitektur/ruma-bolon-simalungun.jpg" 800 600 "tribal,house"

# --- Pakaian / Ulos ---
download_image "images/budaya/pakaian/ulos-sadum.jpg" 800 600 "red,fabric"
download_image "images/budaya/pakaian/ampe-ampe.jpg" 800 600 "shawl"
download_image "images/budaya/pakaian/baju-kurung-pria.jpg" 800 600 "black,shirt"
download_image "images/budaya/pakaian/celana-panjang.jpg" 800 600 "trousers"
download_image "images/budaya/pakaian/piso-gaja-dompak.jpg" 800 600 "dagger,knife"
download_image "images/budaya/pakaian/tungkot-malehat.jpg" 800 600 "wooden,staff"
download_image "images/budaya/pakaian/kebaya.jpg" 800 600 "kebaya,dress"
download_image "images/budaya/pakaian/ulos-ragi-hotang.jpg" 800 600 "woven,fabric"
download_image "images/budaya/pakaian/ulos-pintu-ragi.jpg" 800 600 "textile,pattern"
download_image "images/budaya/pakaian/sunting.jpg" 800 600 "gold,crown"
download_image "images/budaya/pakaian/perhiasan.jpg" 800 600 "gold,jewelry"

download_image "images/budaya/pakaian/ulos/ragi-hotang.jpg" 800 600 "weaving"
download_image "images/budaya/pakaian/ulos/sibolang.jpg" 800 600 "blue,fabric"
download_image "images/budaya/pakaian/ulos/sadum.jpg" 800 600 "red,songket"
download_image "images/budaya/pakaian/ulos/bintang-maratur.jpg" 800 600 "star,pattern"
download_image "images/budaya/pakaian/ulos/tumtuman.jpg" 800 600 "detailed,fabric"
download_image "images/budaya/pakaian/ulos/mangiring.jpg" 800 600 "scarf"

# --- Fakta & Misc ---
download_image "images/fakta/aksara-sample.jpg" 600 400 "writing"
download_image "images/fakta/kesenian-tortor.jpg" 600 400 "dancer"
download_image "images/fakta/kesenian-ulos.jpg" 600 400 "loom"
download_image "images/fakta/budaya-ruma-bolon.jpg" 600 400 "village"
download_image "images/budaya/aksara/video-thumbnail.jpg" 800 600 "video,thumbnail"

echo "Download complete!"


