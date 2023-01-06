# Maintainer: asukaminato <asukaminato@nyan.eu.org>
pkgname=ctools-bin
_pkgname=${pkgname/-bin/}
pkgver=2.0.0
pkgrel=1
pkgdesc='程序开发常用工具 chrome /edge/firefox /utools/windows /linux/mac'
arch=('x86_64')
url="https://github.com/baiy/Ctool"
license=('MIT')
depends=('webkit2gtk-4.1'
	       'gtk3')
source=("${url}/releases/download/v${pkgver}/ctool_tauri_linux.deb")
sha256sums=('62e06cb09dd28775d4a2402bd36654334b2cd8b3e4d6505bff5c33d8b87e6a89')

package() {
	cd $pkgdir
	tar -xpf ${srcdir}/data.tar.gz
}
