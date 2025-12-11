uniform vec3 iResolution;
uniform float iTime;

varying vec2 vUv;  

vec4 firstColor = vec4(1.0,0.0,0.0,1.0); //red
vec4 middleColor = vec4(0.0,1.0,0.0,1.0); // green
vec4 endColor = vec4(0.0,0.0,1.0,1.0); // blue

vec3 pal( in float t ){

   vec3 a = vec3(-0.922, 0.998, 0.780);
   vec3 b = vec3(-2.212, 0.868, 0.468);
   vec3 c = vec3(-0.754, -0.754, -0.012);
   vec3 d = vec3(0.000, 0.000, 0.000);

    return a + b*cos( 6.28318*(c*t+d) );
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (vUv * 2.0) - 1.;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    float gridSize = 4.0;
    
    for (float i = 0.; i < 6.; i++) {
 
        vec2 squareOffset = floor(vec2(uv * gridSize))/gridSize;
        uv = fract(uv * gridSize) - 0.5;


        float d = length(uv) * exp(-length(uv0));
        vec3 col = pal(length(uv0) * (cos(iTime + (i * 0.2))));

        d = sin(d * 8.0 + iTime) / 8.0;
        d = abs(d);

        d = 0.02 / d;
        
        if (mod(i, 3.0) == 0.0) { 
        finalColor += (col * d) / (gridSize * 5.0);
        }
    }
    
    fragColor = vec4(finalColor, 1.0);

    
    if (finalColor == vec3(0.0, 0.0, 0.0)) {
        fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
}


void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}