# Maintainer: asukaminato <asukaminato@nyan.eu.org>
pkgname=ctool-bin
pkgver="v2.0.0"
_pkgname=${pkgname/-bin/}
pkgrel=1
pkgdesc='程序开发常用工具 chrome /edge/firefox /utools/windows /linux/mac'
arch=('x86_64')
url="https://github.com/baiy/Ctool"
license=('MIT')
makedepends=('jq')
depends=('webkit2gtk-4.1'
	 'gtk3')
source=("${url}/releases/latest/download/ctool_tauri_linux.deb")
sha256sums=('SKIP')
pkgver(){
	curl --silent "https://api.github.com/repos/baiy/Ctool/releases/latest" | jq ".tag_name"
}
package() {
	cd $pkgdir
	tar -xpf ${srcdir}/data.tar.gz
}
