upload_data(){
# Try to upload test data
while [ -z "$(curl -H "Content-Type:application/x-turtle" --data-binary "@/tmp/data/clothing_materials.ttl" http://localhost:8080/bigdata/namespace/kb/sparql )" ]
do
    sleep 60
done
echo "Data uploaded"
}

upload_data & # Run process in parallel
/bin/bash /var/lib/jetty/entrypoint.sh