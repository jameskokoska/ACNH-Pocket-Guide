require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-infinite-masonry"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-infinite-masonry
                   DESC
  s.homepage     = "https://github.com/roj4s/react-native-infinite-masonry"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Luis Miguel Rojas Aguilera" => "rojas@icomp.ufam.edu.br" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/roj4s/react-native-infinite-masonry.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

