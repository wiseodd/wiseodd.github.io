#!/usr/bin/env bash
# Verify wiseodd.github.io 301-redirects to agustinus.kristia.de, path kept.
# Usage: ./check.sh   (exit 0 = all pass)

NEW=https://agustinus.kristia.de
VAE=/blog/variational-autoencoder/

# input|expected final URL
cases=(
  "https://wiseodd.github.io/|$NEW/"
  "http://wiseodd.github.io/|$NEW/"
  "https://wiseodd.github.io/techblog/2016/12/10/variational-autoencoder/|$NEW$VAE"
  "https://wiseodd.github.io/techblog/2016/12/10/variational-autoencoder|$NEW$VAE"
  "https://wiseodd.github.io/techblog/|$NEW/blog/"
)

fails=0
for c in "${cases[@]}"; do
  url=${c%%|*}
  want=${c#*|}
  read -r first_code first_loc < <(curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "$url")
  read -r code final hops < <(curl -sL -o /dev/null -w '%{http_code} %{url_effective} %{num_redirects}\n' "$url")

  if [[ $first_code == 301 && $code == 200 && $final == "$want" && $hops -le 4 ]]; then
    echo "PASS $url -> $final ($hops hops)"
  else
    echo "FAIL $url: first=$first_code ${first_loc:--} final=$code $final hops=$hops (want 301 ... 200 $want)"
    fails=$((fails + 1))
  fi
done

exit "$fails"
